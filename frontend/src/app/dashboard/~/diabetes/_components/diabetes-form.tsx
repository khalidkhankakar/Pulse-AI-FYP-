'use client'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import {
    Activity,
    BrainCircuit,
    Droplets,
    Scale,
    User,
    Stethoscope,
    Heart
} from 'lucide-react';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from '@/components/ui/input'
import PredicationCard from '@/components/shared/predication-card'


const schema = z.object({
    pregnancies: z.coerce.number(),
    glucose: z.coerce.number().int().gt(0, "Must be greater than 0"),
    bloodPressure: z.coerce.number().int().gt(0, "Must be greater than 0"),
    skinThickness: z.coerce.number().int().gt(0, "Must be greater than 0"),
    insulin: z.coerce.number().int().gt(0, "Must be greater than 0"),
    bmi: z.coerce.number().gt(0, "Must be greater than 0"),
    diabetesPedigree: z.coerce.number().gt(0, "Must be greater than 0"),
    age: z.coerce.number().int().gt(0, "Must be greater than 0"),
})

type FieldName = keyof z.infer<typeof schema>

const inputFields: {
    name: FieldName
    label: string
    placeholder: string
    icon: React.ReactNode
    desc: string
}[] = [
        { name: 'pregnancies', label: 'Pregnancies', placeholder: 'e.g. 2', icon: <User className="w-4 h-4" />, desc: 'Number of times pregnant' },
        { name: 'glucose', label: 'Glucose', placeholder: 'e.g. 120', icon: <Droplets className="w-4 h-4" />, desc: 'Plasma glucose concentration (mg/dL)' },
        { name: 'bloodPressure', label: 'Blood Pressure', placeholder: 'e.g. 80', icon: <Activity className="w-4 h-4" />, desc: 'Diastolic blood pressure (mm Hg)' },
        { name: 'skinThickness', label: 'Skin Thickness', placeholder: 'e.g. 20', icon: <Stethoscope className="w-4 h-4" />, desc: 'Triceps skin fold thickness (mm)' },
        { name: 'insulin', label: 'Insulin', placeholder: 'e.g. 85', icon: <Droplets className="w-4 h-4" />, desc: '2-Hour serum insulin (mu U/ml)' },
        { name: 'bmi', label: 'BMI', placeholder: 'e.g. 24.5', icon: <Scale className="w-4 h-4" />, desc: 'Body mass index (weight in kg/(height in m)^2)' },
        { name: 'diabetesPedigree', label: 'Pedigree Function', placeholder: 'e.g. 0.47', icon: <BrainCircuit className="w-4 h-4" />, desc: 'Diabetes pedigree function (genetic risk)' },
        { name: 'age', label: 'Age', placeholder: 'e.g. 35', icon: <Heart className="w-4 h-4" />, desc: 'Age in years' },
    ]


const DiabetesForm = () => {

    const form = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
        defaultValues: {
            pregnancies: 0,
            glucose: 0,
            bloodPressure: 0,
            skinThickness: 0,
            insulin: 0,
            bmi: 0,
            diabetesPedigree: 0,
            age: 0,
        },
    })

    function onSubmit(values: z.infer<typeof schema>) {
        console.log(values)
    }

    return (
        <Form {...form}>
            <div className="grid grid-cols-1 mt-4 lg:grid-cols-12 gap-8 items-start">

                <form onSubmit={form.handleSubmit(onSubmit)} className='lg:col-span-8 bg-card border border-border rounded-[2.5rem] shadow-xl shadow-primary/5 p-8 md:p-10' >


                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6" >


                        {inputFields.map((singleField) => (
                            <FormField
                                key={singleField.name}
                                control={form.control}
                                name={singleField.name}
                                render={({ field }) => (
                                    <FormItem className='w-full'>
                                        <FormLabel asChild>
                                            <div>
                                                {singleField.icon}
                                                <span className='flex items-center gap-2'>
                                                    <span>{singleField.label}</span>
                                                </span>
                                            </div>
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                type="number"
                                                className='md:py-5 py-5 md:px-4 md:text-sm rounded-full'
                                                placeholder={singleField.placeholder}

                                            />
                                        </FormControl>
                                        <FormDescription className='text-xs'>{singleField.desc}</FormDescription>
                                        <FormMessage className='text-xs' />
                                    </FormItem>
                                )}
                            />
                        ))}
                    </div>

                    <div className="flex items-center justify-end gap-2 pt-4">

                        <Button type="button" variant="outline" onClick={() => form.reset()}>
                            Reset
                        </Button>
                        <Button type="submit">
                            Submit
                        </Button>
                    </div>

                </form>

                <div className="lg:col-span-4 space-y-6">
                    <PredicationCard />
                </div>
            </div>
        </Form>
    )
}

export default DiabetesForm