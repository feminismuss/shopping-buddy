import styled from "styled-components";
import { StyledButton } from "./StyledButton";

export const FormContainer = styled.form`
  display: grid;
  gap: 0.5rem;
`;

export const Input = styled.input`
  padding: 0.5rem;
  font-size: inherit;
  border: 1px solid black;
  border-radius: 0.5rem;
`;

export const Select = styled.select`
  padding: 0.5rem;
  font-size: inherit;
  border: 1px solid black;
  border-radius: 0.5rem;
`;

export const Textarea = styled.textarea`
  font-family: inherit;
  border: 1px solid black;
  border-radius: 0.5rem;
  padding: 0.5rem;
`;

export const Label = styled.label`
  font-weight: bold;
`;

export default function Form({
  onSubmit,
  formName,
  defaultData,
  categories = [],
}) {
  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    onSubmit(data);
  }
  // const categories = [
  //   "Dairy",
  //   "Bakery",
  //   "Fruits",
  //   "Vegetables",
  //   "Meat",
  //   "Beverages",
  //   "Snacks",
  //   "Household",
  //   "Personal Care",
  //   "Other",
  // ];
  return (
    <FormContainer aria-labelledby={formName} onSubmit={handleSubmit}>
      <Label htmlFor="name">Name</Label>
      <Input
        id="name"
        name="name"
        type="text"
        defaultValue={defaultData?.name}
        required
      />
      <Label htmlFor="image-url">Image Url</Label>
      <Input
        id="image-url"
        name="image"
        type="text"
        defaultValue={defaultData?.image}
      />
      <Label htmlFor="quantity">Quantity</Label>
      <Input
        id="quantity"
        name="quantity"
        type="text"
        defaultValue={defaultData?.quantity}
        required
      />
      <Label htmlFor="category">Category</Label>
      <Select
        id="category"
        name="category"
        defaultValue={defaultData?.category || ""}
        required
      >
        <option value="" disabled>
          Bitte wählen
        </option>
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </option>
        ))}
      </Select>
      <Label htmlFor="comment">Comment</Label>
      <Textarea
        name="comment"
        id="comment"
        cols="30"
        rows="10"
        defaultValue={defaultData?.description}
      ></Textarea>
      <StyledButton type="submit">
        {defaultData ? "Update Item" : "Add Item"}
      </StyledButton>
    </FormContainer>
  );
}
