import { useForm } from "react-hook-form";
import FormField from "./FormField";
import MediaTypeInput from "./MediaTypeInput";
import GenresInput from "./GenresInput";

const SearchForm = () => {
  const { control, register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log(`--------data onsubmit: `, data);
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormField
          name="mediaType"
          label="Media Type"
          control={control}
          Component={MediaTypeInput}
        />

        <FormField
          name="genres"
          label="Genres"
          control={control}
          Component={GenresInput}
        />

        <br />
        <input type="submit" />
      </form>
    </div>
  );
};

export default SearchForm;
