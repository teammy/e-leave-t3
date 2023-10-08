import React, { useState } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import * as z from "zod";
import { capitalize  } from "lodash";
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea, Input, Button } from "@nextui-org/react";
import { ThaiDatePicker } from "thaidatepicker-react";
import {type AddLeaveInput,type UpdateLeaveInput,type LeaveDetail } from "../types";
import  * as validators from "../helpers/validators";

// const schema = z.object({
//   title: z.string().min(1, "ใส่มาดิเห้ย"),
//   excerpt: z.string().min(1).or(z.literal("")),
//   content: z.string().min(1),
// });

export type LeaveFormProps = {
  kind: "create" ;
  onSubmit: SubmitHandler<AddLeaveInput>
} | {
  kind: "edit";
  leave: LeaveDetail;
  onSubmit: SubmitHandler<UpdateLeaveInput["data"]>;
}

const schema = z.object({
  startLeaveDate: z.string().min(1),
  endLeaveDate: z.string().min(1),
  reason: z.string().min(1),
});

const LeaveForm = (props: LeaveFormProps) => {
  const { kind,onSubmit } = props;
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors, isValid },
  } = useForm<typeof onSubmit extends SubmitHandler<AddLeaveInput> ? AddLeaveInput : UpdateLeaveInput['data']>({
    mode: "onBlur",
    resolver: zodResolver(kind === "create" ? validators.addLeaveData : validators.updateLeaveForm),
    defaultValues: kind === "edit" ? props.leave : undefined,
  });

  const currentStartLeaveDate = getValues("startLeaveDate");
  // console.log('currentStartLeaveDate',currentStartLeaveDate);
  const currentEndLeaveDate = getValues("endLeaveDate");
  // const currentLeaveDateRange = {
  //   startDate: currentLeaveDate,
  //   endDate: currentLeaveDate,
  // };

  const [selectedThaiDate, setSelectedThaiDate] = useState("");

  const handleDatePickerStartChange = (christDate, buddhistDate) => {
      setValue('startLeaveDate', christDate, {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true,
      });
    // console.log('StartDate:',christDate);
    // setSelectedStartDate(christDate);
    setSelectedThaiDate(buddhistDate);
  };

  const handleDatePickerEndChange = (christDate, buddhistDate) => {
      setValue("endLeaveDate", christDate, {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true,
      });
  };
  //   console.log('EndDate:',christDate);
  //   // setSelectedEndDate(christDate);
  //   setSelectedThaiDate(buddhistDate);
  // };

  // const handleDatePickerChange = (christDate) => {
  //   if (!christDate) {
  //     setValue("leaveDate", christDate, {
  //       shouldValidate: true,
  //       shouldDirty: true,
  //       shouldTouch: true,
  //     });
  //   }
  // };

  // const {
  //   register,
  //   setValue,
  //   getValues,
  //   handleSubmit,
  //   formState: { errors,isValid },
  // } = useForm<z.infer<typeof schema>>({
  //   mode: "onBlur",
  //   resolver: zodResolver(
  //     schema
  //   ),
  // });

  // useEffect(() => {
  //   setValue("title", "title#1",{
  //     shouldValidate: true,
  //     shouldDirty: true,
  //     shouldTouch: true,
  //   });
  // }, [setValue]);

  // console.log('getValues',getValues());

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1>{capitalize(kind)}</h1>
      <div>
        <ThaiDatePicker
          id="startLeaveDate"
          onChange={handleDatePickerStartChange}
          value={currentStartLeaveDate}
        />
      </div>
      <div>
        <ThaiDatePicker
          id="endLeaveDate"
          onChange={handleDatePickerEndChange}
          value={currentEndLeaveDate}
        />
      </div>
      <Textarea
        id="reason"
        variant="bordered"
        cols={30}
        rows={2}
        {...register("reason")}
      ></Textarea>
      {errors.reason && <div>{errors.reason.message}</div>}
      <Button color="primary" type="submit" isDisabled={!isValid}>
      {capitalize(kind)}
      </Button>
    </form>
    // <form onSubmit={handleSubmit((value) => console.log(value))}>
    //   <Input
    //     type="text"
    //     id="title"
    //     label="title"
    //     labelPlacement="outside-left"
    //     variant="bordered"
    //     {...register("title")}
    //   />
    //   {errors.title && <div>{errors.title.message}</div>}
    //   <Textarea
    //     id="excerpt"
    //     cols={10}
    //     rows={2}
    //     labelPlacement="outside-left"
    //     label="Excerpt"
    //     variant="bordered"
    //     placeholder="Enter your excerpt"
    //     {...register("excerpt")}
    //   ></Textarea>
    //   {errors.excerpt && <div>{errors.excerpt.message}</div>}
    //   <Textarea
    //     id="content"
    //     cols={10}
    //     rows={2}
    //     labelPlacement="outside-left"
    //     label="Content"
    //     variant="bordered"
    //     placeholder="Enter your Content"
    //     {...register("content")}
    //   ></Textarea>
    //   {errors.content && <div>{errors.content.message}</div>}
    //   <Button type="submit" color="primary" isDisabled={!isValid}>
    //     Submit
    //   </Button>
    // </form>
  );
};

export default LeaveForm;
