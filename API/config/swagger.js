const swaggerJsdoc = require("swagger-jsdoc");

function createSwaggerSpec(port) {
  const options = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "Rate Limited File Uploader API",
        version: "1.0.0",
        description:
          "Upload `.txt` or `.csv` files and get back the file name, size, and word count. " +
          "Each IP address is limited to **5 uploads per minute**."
      },
      servers: [
        { url: `http://localhost:${port}/api`, description: "Local development" }
      ],
      components: {
        schemas: {
          UploadSuccess: {
            type: "object",
            properties: {
              name:      { type: "string",  example: "report.csv" },
              sizeBytes: { type: "integer", example: 2048 },
              wordCount: { type: "integer", example: 312 }
            }
          },
          ErrorResponse: {
            type: "object",
            properties: {
              message: { type: "string", example: "Only .txt and .csv files are allowed" }
            }
          },
          RateLimitResponse: {
            type: "object",
            properties: {
              message:    { type: "string", example: "Rate limit exceeded. Maximum 5 uploads per minute." },
              retryAfter: { type: "string", example: "42s" }
            }
          }
        }
      },
      paths: {
        "/upload": {
          post: {
            tags: ["Upload"],
            summary: "Upload a .txt or .csv file",
            description:
              "Accepts a single file via `multipart/form-data`. " +
              "Returns the file name, size in bytes, and total word count. " +
              "Rate limited to 5 requests per minute per IP address.",
            requestBody: {
              required: true,
              content: {
                "multipart/form-data": {
                  schema: {
                    type: "object",
                    required: ["file"],
                    properties: {
                      file: {
                        type: "string",
                        format: "binary",
                        description: "The .txt or .csv file to upload (max 5 MB)"
                      }
                    }
                  }
                }
              }
            },
            responses: {
              200: {
                description: "File processed successfully",
                content: {
                  "application/json": {
                    schema: { $ref: "#/components/schemas/UploadSuccess" }
                  }
                }
              },
              400: {
                description: "No file provided or unsupported file type",
                content: {
                  "application/json": {
                    schema: { $ref: "#/components/schemas/ErrorResponse" }
                  }
                }
              },
              413: {
                description: "File exceeds the 5 MB size limit",
                content: {
                  "application/json": {
                    schema: { $ref: "#/components/schemas/ErrorResponse" }
                  }
                }
              },
              429: {
                description: "Rate limit exceeded — check the `Retry-After` response header",
                headers: {
                  "Retry-After": {
                    schema: { type: "integer" },
                    description: "Seconds until the rate limit window resets"
                  }
                },
                content: {
                  "application/json": {
                    schema: { $ref: "#/components/schemas/RateLimitResponse" }
                  }
                }
              }
            }
          }
        }
      }
    },
    apis: []
  };

  return swaggerJsdoc(options);
}

module.exports = createSwaggerSpec;
