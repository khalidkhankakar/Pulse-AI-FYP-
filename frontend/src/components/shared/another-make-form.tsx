'use client'

import React from 'react'
import { useForm, DefaultValues, FieldPath } from 'react-hook-form'
import { ZodSchema, z } from 'zod'
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

// Type definitions for form fields
type BaseField<T extends ZodSchema> = {
  // @ts-expect-error - Zod schema generic typing constraint
  name: FieldPath<z.infer<T>>
  label: string
  placeholder?: string
  icon?: React.ReactNode
  desc?: string
}

type InputField<T extends ZodSchema> = BaseField<T> & {
  fieldType: 'input'
  typeInput?: React.HTMLInputTypeAttribute
}

type SelectOption = {
  label: string
  value: string
}

type SelectField<T extends ZodSchema> = BaseField<T> & {
  fieldType: 'select'
  options: readonly SelectOption[]
}

type FormField = 
  | Omit<InputField<ZodSchema>, 'name'> & { name: string }
  | (Omit<SelectField<ZodSchema>, 'name' | 'options'> & { name: string; options: readonly SelectOption[] })

interface AnotherMakeFormProps<T extends ZodSchema> {
  formSchema: T
  defaultValues: DefaultValues<z.infer<T>>
  // Accept both mutable and readonly field arrays
  inputFields: readonly FormField[]
  onSubmit: (values: z.infer<T>) => void | Promise<void>
  submitLabel?: string
  resetLabel?: string
  className?: string
  formClassName?: string
}

const AnotherMakeForm = <T extends ZodSchema>({
  formSchema,
  defaultValues,
  inputFields,
  onSubmit,
  submitLabel = 'Submit',
  resetLabel = 'Reset',
  className,
  formClassName,
}: AnotherMakeFormProps<T>) => {
  // @ts-expect-error - Zod schema constraint issue with React Hook Form generics
  const form = useForm<z.infer<T>>({
    // @ts-expect-error - known issue with generic Zod schema typing
    resolver: zodResolver(formSchema),
    defaultValues,
    mode: 'onBlur',
  })

  const handleSubmit = async (values: z.infer<T>) => {
    try {
      await onSubmit(values)
    } catch (error) {
      console.error('Form submission error:', error)
    }
  }

  return (
    // @ts-expect-error - Zod schema constraint issue with React Hook Form
    <Form {...form}>
      <form
        // @ts-expect-error - handleSubmit type compatibility
        onSubmit={form.handleSubmit(handleSubmit)}
        className={
          formClassName ||
          'bg-card border border-border rounded-[2.5rem] shadow-xl shadow-primary/5 p-8 md:p-10'
        }
      >
        <div className={className || 'grid grid-cols-1 md:grid-cols-2 gap-6'}>
          {inputFields.map((field) => (
            <FormField
              key={field.name}
              // @ts-expect-error - control type compatibility with generic schema
              control={form.control}
              name={field.name}
              render={({ field: fieldProps }) => (
                <FormItem className="w-full">
                  <FormLabel asChild>
                    <div className="flex items-center gap-2">
                      {field.icon && <span>{field.icon}</span>}
                      <span>{field.label}</span>
                    </div>
                  </FormLabel>

                  {/* Input Field */}
                  {field.fieldType === 'input' && (
                    <FormControl>
                      <Input
                        {...fieldProps}
                        type={field.typeInput || 'text'}
                        placeholder={field.placeholder}
                        className="md:py-5 py-5 md:px-4 md:text-sm rounded-full"
                      />
                    </FormControl>
                  )}

                  {/* Select Field */}
                  {field.fieldType === 'select' && (
                    <FormControl>
                      <Select
                        onValueChange={fieldProps.onChange}
                        defaultValue={fieldProps.value?.toString()}
                      >
                        <SelectTrigger className="md:py-5 w-full py-5 md:px-4 md:text-sm rounded-full">
                          <SelectValue
                            placeholder={field.placeholder || 'Select option'}
                          />
                        </SelectTrigger>
                        <SelectContent>
                          {field.options.map((option: SelectOption) => (
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

                  {field.desc && (
                    <FormDescription className="text-xs">
                      {field.desc}
                    </FormDescription>
                  )}

                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
          ))}
        </div>

        <div className="flex items-center justify-end gap-2 pt-8">
          <Button
            type="button"
            variant="outline"
            onClick={() => form.reset()}
          >
            {resetLabel}
          </Button>

          <Button type="submit" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting ? 'Submitting...' : submitLabel}
          </Button>
        </div>
      </form>
    </Form>
  )
}

export default AnotherMakeForm
