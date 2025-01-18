import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import React from "react";
import { useForm } from "react-hook-form";

const CommonReusablaForm = ({ onSubmit, formSubmitting = false }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const handleFormSubmit = (data) => {
    onSubmit(data);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-2">
      <div className="space-y-2">
        <Label htmlFor="rating">Rating (1-5)</Label>
        <Input
          id="rating"
          type="number"
          placeholder="Place your rating."
          {...register("rating", {
            required: "Your rating is required.",
            valueAsNumber: true,
            validate: (value) =>
              (value > 0 && value <= 5) || "Rating must be between 1 and 5",
          })}
          className={`${errors.rating ? "border-red-600" : ""}`}
        />
        {errors.rating && (
          <p className="text-red-500 text-sm">{errors.rating.message}</p>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="comment">Comment</Label>
        <Textarea
          id="comment"
          placeholder="Enter your experiance."
          {...register("comment", {
            required: "Comment is required.",
            maxLength: {
              value: 250,
              message: "Comment cannot exceed 250 characters.",
            },
          })}
          className={`${errors.rating ? "border-red-600" : ""}`}
        />
        {errors.comment && (
          <p className="text-red-500 text-sm">{errors.comment.message}</p>
        )}
      </div>

      <Button
        type="submit"
        className="w-full bg-black text-white rounded-xl hover:bg-black hover:text-white"
        loading={formSubmitting}
      >
        Submit
      </Button>
    </form>
  );
};

export default CommonReusablaForm;
