"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { state, country } from "@/lib/data";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { ComboboxSelect } from "@/components/ui/custom-select";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useEffect } from "react";

export const AddressForm = ({ onSubmit, ref }) => {
  const form = useForm({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      name: "",
      mobile: "",
      address: "",
      landmark: "",
      city: "",
      pincode: "",
      state: "",
      country: "India",
    },
  });

  useEffect(() => {
    const orders = JSON.parse(localStorage.getItem("orders"));
    if (orders) {
      form.reset(orders[orders.length - 1].address);
    }
  }, []);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-10">
        <div className="grid grid-cols-4 gap-4 w-full space-y-2">
          <div className="col-span-2">
            <FormFieldLocal
              form={form}
              props={{
                name: "name",
                label: "Name",
                placeholder: "Full name",
              }}
            />
          </div>
          <div className="col-span-2">
            <FormFieldLocal
              form={form}
              props={{
                name: "mobile",
                label: "Mobile Number",
                placeholder: "10-digit mobile number",
              }}
            />
          </div>
          <div className="col-span-4">
            <FormField
              control={form?.control}
              name="address"
              render={({ field }) => (
                <FormItem className="relative w-full">
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Area and street" {...field} />
                  </FormControl>
                  {/* {props?.desc && (
                    <FormDescription>{props?.desc}</FormDescription>
                  )} */}
                  <FormMessage className="absolute -bottom-6 left-0" />
                </FormItem>
              )}
            />
          </div>
          <div className="col-span-2">
            <FormFieldLocal
              form={form}
              props={{
                name: "landmark",
                label: "Landmark",
                placeholder: "Locality (Optional)",
              }}
            />
          </div>
          <div className="col-span-2">
            <FormFieldLocal
              form={form}
              props={{
                name: "city",
                label: "City",
                placeholder: "City/District/Town",
              }}
            />
          </div>
          <div className="col-span-2">
            <FormFieldLocal
              form={form}
              props={{
                name: "pincode",
                label: "Pincode",
                placeholder: "6-digit pincode",
              }}
            />
          </div>
          <div className="col-span-2">
            <FormField
              control={form?.control}
              name="state"
              render={({ field }) => (
                <FormItem className="relative flex flex-col w-full">
                  <FormLabel className="my-1">State</FormLabel>
                  <FormControl>
                    <ComboboxSelect
                      field={field}
                      label={"State"}
                      data={StateEnum.options}
                    />
                  </FormControl>
                  <FormMessage className="absolute -bottom-6 left-0" />
                </FormItem>
              )}
            />
          </div>
        </div>
        <Button ref={ref} type="submit" className="sr-only">
          Submit
        </Button>
      </form>
    </Form>
  );
};

const FormFieldLocal = ({ form, props }) => {
  return (
    <FormField
      control={form?.control}
      name={props?.name}
      render={({ field }) => (
        <FormItem className="relative w-full">
          <FormLabel>{props?.label}</FormLabel>
          <FormControl>
            <Input placeholder={props?.placeholder} {...field} />
          </FormControl>
          {props?.desc && <FormDescription>{props?.desc}</FormDescription>}
          <FormMessage className="absolute -bottom-6 left-0" />
        </FormItem>
      )}
    />
  );
};

// Define enums for states and countries
const StateEnum = z.enum(state, { message: "Select a valid state" });
const CountryEnum = z.enum(country, { message: "Select a valid country" });

const addressSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .min(4, "Name is too short")
    .max(50, "Name is too long"),
  mobile: z
    .string()
    .regex(/^[6-9]\d{9}$/, "Invalid mobile number")
    .nonempty("Mobile number is required"),
  address: z.string().min(1, "Address is required"),
  landmark: z.string().optional(),
  city: z.string().min(1, "City is required"),
  pincode: z
    .string()
    .nonempty("Pincode is required")
    .min(6, "Pincode must be 6 digit"),
  state: StateEnum,
  country: CountryEnum,
});
