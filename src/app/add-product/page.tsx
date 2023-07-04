import { prisma } from "@/lib/db/prisma";
import { redirect } from "next/navigation";

export const medata = {
    title: "Add Product - Flowmazon"
}

async function addProduct(formData: FormData) {
  "use server";

  const name = formData.get("name")?.toString()
  const description = formData.get("description")?.toString()
  const imageUrl = formData.get("imageUrl")?.toString()
  const price = Number(formData.get('price') || 0)

  if (!name || !description || !imageUrl || !price){
    throw Error("Missing required fields")
  }

  await prisma.products.create({
    data: { name, description, imageUrl, price}
  })

  redirect('/')
}

export default function AddProductPage() {
  return (
    <div className="bg-slate-500 p-3">
      <h1 className="mb-3 text-lg font-bold">ADD Product</h1>
      <form action={addProduct}>
        <input required name="name" placeholder="Name" className="mb-3 w-full input input-bordered" />
        <textarea required name="description" placeholder="Description" className="textarea-bordered textarea mb-3 w-full" />
        <input required name="imageUrl" placeholder="Image URL" type="url" className="mb-3 w-full input input-bordered" />
        <input required name="price" placeholder="Price" type="number" className="mb-3 w-full input input-bordered" />
        <button className="btn btn-primary btn-block" type="submit" >Add Product</button>
      </form>
    </div>
  );
}
