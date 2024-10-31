import { useForm } from "react-hook-form";
import FormField from "./FormField";
import MediaTypeInput from "./MediaTypeInput";
import GenresInput from "./GenresInput";
import RatingInput from "./RatingInput";

const SearchForm = () => {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      mediaType: "movie",
      genres: [],
      rating: "All",
    },
  });

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

        <FormField
          name="rating"
          label="Rating"
          control={control}
          Component={RatingInput}
        />

        <br />
        <input type="submit" />
      </form>
    </div>
  );
};

export default SearchForm;
