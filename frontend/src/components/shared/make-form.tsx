'use client'

import React from 'react'
import { useForm, DefaultValues, FieldPath } from 'react-hook-form'
import { z, ZodTypeAny } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'



type BaseField<TSchema extends ZodTypeAny> = {
  name: FieldPath<z.infer<TSchema>>
  label: string
  placeholder?: string
  icon?: React.ReactNode
  desc?: string
}

type InputField<TSchema extends ZodTypeAny> = BaseField<TSchema> & {
  fieldType: 'input'
  typeInput?: React.HTMLInputTypeAttribute
}

type SelectField<TSchema extends ZodTypeAny> = BaseField<TSchema> & {
  fieldType: 'select'
  options: {
    label: string
    value: string
  }[]
}

type FieldConfig<TSchema extends ZodTypeAny> =
  | InputField<TSchema>
  | SelectField<TSchema>

interface MakeFormProps<TSchema extends ZodTypeAny> {
  formSchema: TSchema
  defaultValues: DefaultValues<z.infer<TSchema>>
  inputFields: FieldConfig<TSchema>[]
  onSubmit: (values: z.infer<TSchema>) => void
  submitLabel?: string
  resetLabel?: string
}

const MakeForm = <TSchema extends ZodTypeAny>({
  formSchema,
  defaultValues,
  inputFields,
  onSubmit,
  submitLabel = 'Submit',
  resetLabel = 'Reset',
}: MakeFormProps<TSchema>) => {
  const form = useForm<z.infer<TSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  })

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="bg-card border border-border rounded-[2.5rem] shadow-xl shadow-primary/5 p-8 md:p-10"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {inputFields.map((singleField) => (
            <FormField
              key={singleField.name}
              control={form.control}
              name={singleField.name}
              render={({ field }) => (
                <FormItem className="w-full">
                  
                  {/* KEEPING YOUR LABEL STYLE */}
                  <FormLabel asChild>
                    <div>
                      {singleField.icon}
                      <span className="flex items-center gap-2">
                        <span>{singleField.label}</span>
                      </span>
                    </div>
                  </FormLabel>

                  {/* INPUT */}
                  {singleField.fieldType === 'input' && (
                    <FormControl>
                      <Input
                        {...field}
                        type={singleField.typeInput || 'text'}
                        placeholder={singleField.placeholder}
                        className="md:py-5 py-5 md:px-4 md:text-sm rounded-full"
                      />
                    </FormControl>
                  )}

                  {/* SELECT (Styled like your input) */}
                  {singleField.fieldType === 'select' && (
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value?.toString()}
                      >
                        <SelectTrigger className="md:py-5 w-full py-5 md:px-4 md:text-sm rounded-full">
                          <SelectValue placeholder={singleField.placeholder || 'Select option'} />
                        </SelectTrigger>
                        <SelectContent>
                          {singleField.options.map((option) => (
                            <SelectItem
                              key={option.value}
                              value={option.value}
                            >
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                  )}

                  <FormDescription className="text-xs">
                    {singleField.desc}
                  </FormDescription>

                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
          ))}
        </div>

        <div className="flex items-center justify-end gap-2 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => form.reset()}
          >
            {resetLabel}
          </Button>

          <Button type="submit">{submitLabel}</Button>
        </div>
      </form>
    </Form>
  )
}

export default MakeForm