import { Request, Response } from "express";
// ! Provider APIs
// PATCH /api/provider/orders/:id → update order status //* NEED TO MAKE IT

/*
  id          String  @id @default(cuid())
  name        String
  description String?
  price       Float
  image       String?

  providerId String
  categoryId String

  provider ProviderProfile @relation(fields: [providerId], references: [id])
  category Category        @relation(fields: [categoryId], references: [id])

  orderItems OrderItem[]
  reviews    Review[]
*/
const addMeals = async (req: Request, res: Response) => {
  try {
    const { name, description, price, image, categoryId } = req.body;
    // check user is login or not
    if (!req.user) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    return res.status(200).json({
      success: true,
      data: { name, description, price, image, categoryId },
    });
  } catch (error) {
    console.log(error);
  }
};

// update a meal
const updateMeal = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    console.log(id);
    res
      .status(200)
      .json({ success: true, message: "Data Update Successfully" });
  } catch (error) {
    console.log(error);
  }
};
const deleteMeals = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    console.log(id);
    res
      .status(200)
      .json({ success: true, message: "Data Deleted Successfully" });
  } catch (error) {
    console.log(error);
  }
};

export const providerApi = {
  addMeals,
  updateMeal,
  deleteMeals,
};
