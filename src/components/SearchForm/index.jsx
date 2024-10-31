import React from "react";
import { useForm } from "react-hook-form";
import FormField from "./FormField";
import MediaTypeInput from "./MediaTypeInput";

const SearchForm = () => {
  const { control, register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log(`--------data onsubmit: `, data);
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* <label>Media Type</label>
        <br />
        <input type="radio" {...register("mediaType")} value="movie" />
        <label>Movie</label>
        <br />
        <input type="radio" {...register("mediaType")} value="tv" />
        <label>TVShow</label> */}
        <FormField
          name="mediaType"
          label="Media Type"
          control={control}
          Component={MediaTypeInput}
        />

        <br />
        <input type="submit" />
      </form>
    </div>
  );
};

export default SearchForm;
