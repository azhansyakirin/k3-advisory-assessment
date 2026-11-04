export const createLead = async (data) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  console.log("Creating lead with data:", data);

  if(data.email.endsWith("failed@mail.com")) {
    throw new Error("Failed to create lead");
  }

  return {
    id: `lead_${Date.now()}`,
    ...data,
  };
};