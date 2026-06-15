'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, LineChart, Line } from 'recharts'

const diseasePerformanceData = [
  {
    metric: 'Accuracy',
    Diabetes: 94.2,
    Heart: 89.5,
    Stroke: 91.3,
    Liver: 88.7,
  },
  {
    metric: 'Precision',
    Diabetes: 92.8,
    Heart: 87.9,
    Stroke: 90.1,
    Liver: 86.4,
  },
  {
    metric: 'Recall',
    Diabetes: 93.5,
    Heart: 88.2,
    Stroke: 89.8,
    Liver: 87.2,
  },
  {
    metric: 'F1-Score',
    Diabetes: 93.1,
    Heart: 88.0,
    Stroke: 89.9,
    Liver: 86.8,
  },
]

const chartConfig = {
  Diabetes: {
    label: 'Diabetes',
    color: 'var(--color-chart-1)',
  },
  Heart: {
    label: 'Heart',
    color: 'var(--color-chart-2)',
  },
  Stroke: {
    label: 'Stroke',
    color: 'var(--color-chart-3)',
  },
  Liver: {
    label: 'Liver',
    color: 'var(--color-chart-4)',
  },
}

export const MLModelPerformance = () => {
  return (
    <div className='flex flex-col gap-4 md:gap-6 lg:gap-8'>
      <Card className='col-span-full'>
        <CardHeader className='p-4 md:p-6'>
          <CardTitle className='text-lg md:text-2xl'>ML Model Performance Metrics</CardTitle>
          <CardDescription className='text-xs md:text-sm'>
            Performance comparison of ML models across four disease predictions
          </CardDescription>
        </CardHeader>
        <CardContent className='p-4 md:p-6'>
          <ChartContainer config={chartConfig} className='h-[250px] sm:h-[300px] md:h-[350px] lg:h-[400px] w-full'>
            <BarChart data={diseasePerformanceData}>
              <CartesianGrid strokeDasharray='3 3' />
              <XAxis dataKey='metric' fontSize={12} />
              <YAxis domain={[0, 100]} fontSize={12} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <ChartLegend content={<ChartLegendContent />} />
              <Bar dataKey='Diabetes' fill={chartConfig.Diabetes.color} radius={[8, 8, 0, 0]} />
              <Bar dataKey='Heart' fill={chartConfig.Heart.color} radius={[8, 8, 0, 0]} />
              <Bar dataKey='Stroke' fill={chartConfig.Stroke.color} radius={[8, 8, 0, 0]} />
              <Bar dataKey='Liver' fill={chartConfig.Liver.color} radius={[8, 8, 0, 0]} />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 lg:gap-8'>
        <Card>
          <CardHeader className='p-4 md:p-6'>
            <CardTitle className='text-base md:text-lg'>Diabetes Model</CardTitle>
            <CardDescription className='text-xs md:text-sm'>Accuracy: 94.2%</CardDescription>
          </CardHeader>
          <CardContent className='p-4 md:p-6'>
            <ChartContainer config={chartConfig} className='h-[180px] sm:h-[220px] md:h-[250px] w-full'>
              <LineChart
                data={[
                  { month: 'Jan', value: 88 },
                  { month: 'Feb', value: 90 },
                  { month: 'Mar', value: 91 },
                  { month: 'Apr', value: 92 },
                  { month: 'May', value: 93 },
                  { month: 'Jun', value: 94.2 },
                ]}
              >
                <CartesianGrid strokeDasharray='3 3' />
                <XAxis dataKey='month' fontSize={12} />
                <YAxis domain={[85, 100]} fontSize={12} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line type='monotone' dataKey='value' stroke={chartConfig.Diabetes.color} dot={false} strokeWidth={2} />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className='p-4 md:p-6'>
            <CardTitle className='text-base md:text-lg'>Heart Disease Model</CardTitle>
            <CardDescription className='text-xs md:text-sm'>Accuracy: 89.5%</CardDescription>
          </CardHeader>
          <CardContent className='p-4 md:p-6'>
            <ChartContainer config={chartConfig} className='h-[180px] sm:h-[220px] md:h-[250px] w-full'>
              <LineChart
                data={[
                  { month: 'Jan', value: 82 },
                  { month: 'Feb', value: 84 },
                  { month: 'Mar', value: 86 },
                  { month: 'Apr', value: 87 },
                  { month: 'May', value: 88 },
                  { month: 'Jun', value: 89.5 },
                ]}
              >
                <CartesianGrid strokeDasharray='3 3' />
                <XAxis dataKey='month' fontSize={12} />
                <YAxis domain={[80, 95]} fontSize={12} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line type='monotone' dataKey='value' stroke={chartConfig.Heart.color} dot={false} strokeWidth={2} />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className='p-4 md:p-6'>
            <CardTitle className='text-base md:text-lg'>Stroke Prediction Model</CardTitle>
            <CardDescription className='text-xs md:text-sm'>Accuracy: 91.3%</CardDescription>
          </CardHeader>
          <CardContent className='p-4 md:p-6'>
            <ChartContainer config={chartConfig} className='h-[180px] sm:h-[220px] md:h-[250px] w-full'>
              <LineChart
                data={[
                  { month: 'Jan', value: 85 },
                  { month: 'Feb', value: 87 },
                  { month: 'Mar', value: 88 },
                  { month: 'Apr', value: 90 },
                  { month: 'May', value: 91 },
                  { month: 'Jun', value: 91.3 },
                ]}
              >
                <CartesianGrid strokeDasharray='3 3' />
                <XAxis dataKey='month' fontSize={12} />
                <YAxis domain={[83, 95]} fontSize={12} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line type='monotone' dataKey='value' stroke={chartConfig.Stroke.color} dot={false} strokeWidth={2} />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className='p-4 md:p-6'>
            <CardTitle className='text-base md:text-lg'>Liver Disease Model</CardTitle>
            <CardDescription className='text-xs md:text-sm'>Accuracy: 88.7%</CardDescription>
          </CardHeader>
          <CardContent className='p-4 md:p-6'>
            <ChartContainer config={chartConfig} className='h-[180px] sm:h-[220px] md:h-[250px] w-full'>
              <LineChart
                data={[
                  { month: 'Jan', value: 80 },
                  { month: 'Feb', value: 82 },
                  { month: 'Mar', value: 84 },
                  { month: 'Apr', value: 86 },
                  { month: 'May', value: 88 },
                  { month: 'Jun', value: 88.7 },
                ]}
              >
                <CartesianGrid strokeDasharray='3 3' />
                <XAxis dataKey='month' fontSize={12} />
                <YAxis domain={[78, 92]} fontSize={12} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line type='monotone' dataKey='value' stroke={chartConfig.Liver.color} dot={false} strokeWidth={2} />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
