import { Controller } from "react-hook-form";

const FormField = ({ control, label, name, Component }) => {
  return (
    <div>
      <p className="mb-1 font-bold">{label}</p>
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value, name } }) => {
          console.log(`----------xxx:`, value);
          return (
            <Component
              onChange={onChange}
              value={value}
              name={name}
              control={control}
            />
          );
        }}
      />
    </div>
  );
};

export default FormField;
