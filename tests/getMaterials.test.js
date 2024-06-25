const axios = require("axios");

jest.mock("axios"); // Automatically mocks axios methods

test("Testing a successful API request", async () => {
  // Mocking a successful API response
  axios.get.mockResolvedValue({
    data: [{ name: "Material 1" }, { name: "Material 2" }],
  });

  // Assuming you have a function to fetch materials
  const materials = await fetchMaterials();

  // Assert the expected behavior based on the mocked response
  expect(materials.length).toBe(2);
  expect(materials[0].name).toBe("Material 1");
  expect(materials[1].name).toBe("Material 2");
});

// Function to fetch materials using axios
async function fetchMaterials() {
  try {
    const response = await axios.get("/materials"); // Example endpoint
    return response.data;
  } catch (error) {
    console.error("Failed to fetch materials:", error);
    throw error;
  }
}
