import { expect, test } from "@playwright/test";
import { binsSchema } from "../../schemas/bins";

const apiPath = "/v3/b";

test.describe("POST /v3/b", () => {
  // Positive tests
  test.describe("when creating a new bin", () => {
    // bins ids to delete after all tests
    const binsToDelete: string[] = [];

    // delete bins after all tests
    test.afterAll(async ({ request }) => {
      console.log("Tests cleanup started. Bins to delete: ", binsToDelete);

      for (const bin_id of binsToDelete) {
        const response = await request.delete(`/v3/b/${bin_id}`);
        expect(response.status()).toBe(200);
      }
    });

    test("creates a bin with valid data @smoke", async ({ request }) => {
      // Given
      const newBin = {
        sample: "Hello World",
      };

      // When
      const response = await request.post(apiPath, {
        data: newBin,
      });

      // Then
      expect(response.status()).toBe(200);
      const responseBody = await response.json();
      expect(responseBody).toMatchObject(binsSchema());
      expect(responseBody.record.sample).toBe(newBin.sample);
      // add bin id to delete after all tests
      binsToDelete.push(responseBody.metadata.id);
    });

    test("create a bit with header X-Bin-Private set to false", async ({
      request,
    }) => {
      // Given
      const newBin = {
        sample: "Hello World",
      };
      const headers = {
        "X-Bin-Private": "false",
      };

      // When
      const response = await request.post(apiPath, {
        data: newBin,
        headers: headers,
      });

      // Then
      expect(response.status()).toBe(200);
      const responseBody = await response.json();
      expect(responseBody).toMatchObject(binsSchema());
      expect(responseBody.record.sample).toBe(newBin.sample);
      // add bin id to delete after all tests
      binsToDelete.push(responseBody.metadata.id);
    });

    test("create a bit with header X-Bin-Name", async ({ request }) => {
      // Given
      const newBin = {
        sample: "Hello World",
      };
      const headers = {
        "X-Bin-Name": "My Bin",
      };

      // When
      const response = await request.post(apiPath, {
        data: newBin,
        headers: headers,
      });

      // Then
      expect(response.status()).toBe(200);
      const responseBody = await response.json();
      expect(responseBody).toMatchObject(binsSchema());
      expect(responseBody.record.sample).toBe(newBin.sample);
      expect(responseBody.metadata.name).toBe(headers["X-Bin-Name"]);
      // add bin id to delete after all tests
      binsToDelete.push(responseBody.metadata.id);
    });
  });

  // Negative tests
  test.describe("when request body is empty", () => {
    test("return 401 error when X-Access-Key is not provided", async ({
      request,
    }) => {
      // Given
      const newBin = {
        sample: "Hello World",
      };
      const headers = {
        "X-Access-Key": "",
      };

      // When
      const response = await request.post(apiPath, {
        data: newBin,
        headers: headers,
      });

      // Then
      expect(response.status()).toBe(401);
      const responseBody = await response.json();
      expect(responseBody.message).toBe(
        "You need to pass X-Master-Key or X-Access-Key in the header to create a bin",
      );
    });

    test("returns 400 error with validation message", async ({ request }) => {
      // Given
      const newBin = {};

      // When
      const response = await request.post(apiPath, {
        data: newBin,
      });

      // Then
      expect(response.status()).toBe(400);
      const responseBody = await response.json();
      expect(responseBody.message).toBe("Bin cannot be blank");
    });
  });
});
