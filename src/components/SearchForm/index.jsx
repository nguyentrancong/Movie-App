import { useForm } from "react-hook-form";
import FormField from "./FormField";
import MediaTypeInput from "./MediaTypeInput";
import GenresInput from "./GenresInput";
import RatingInput from "./RatingInput";
import { useEffect } from "react";

const SearchForm = ({ setSearchFormValue, searchFormValue }) => {
  const { control, handleSubmit, watch, reset } = useForm({
    defaultValues: searchFormValue,
  });

  useEffect(() => {
    reset(searchFormValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(searchFormValue)]);

  const formValue = watch();
  useEffect(() => {
    setSearchFormValue(formValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(formValue)]);

  const onSubmit = (data) => {
    // TODO: something when using submit button
    console.log(`--------data onsubmit: `, data);
  };

  return (
    <div className="rounded-lg border p-4 shadow-sm">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
      </form>
    </div>
  );
};

export default SearchForm;
