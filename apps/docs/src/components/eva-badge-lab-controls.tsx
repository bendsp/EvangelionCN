"use client"

import { EvaText } from "@eva-cn/registry/eva-text"
import { Field, FieldTitle } from "@/components/ui/field"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"

const sliderClassName = "[&_[data-slot=slider-range]]:bg-eva-amber [&_[data-slot=slider-thumb]]:size-4 [&_[data-slot=slider-thumb]]:rounded-none [&_[data-slot=slider-thumb]]:border-eva-amber [&_[data-slot=slider-thumb]]:bg-eva-black [&_[data-slot=slider-track]]:h-2 [&_[data-slot=slider-track]]:rounded-none"
const toggleClassName = "rounded-none border border-eva-amber px-3 font-mono text-[0.68rem] uppercase data-[pressed]:bg-eva-amber data-[pressed]:text-eva-black"

interface LabSliderProps {
  disabled?: boolean
  id: string
  label: string
  max: number
  min: number
  onChange: (value: number) => void
  step?: number
  unit?: string
  value: number
}

export function LabSlider({
  disabled,
  id,
  label,
  max,
  min,
  onChange,
  step = 1,
  unit = "PX",
  value,
}: LabSliderProps) {
  return (
    <Field data-disabled={disabled || undefined}>
      <FieldTitle className="control-label" id={`${id}-label`}>
        <EvaText as="span" tracking="wide" variant="data">{label}</EvaText>
        <output>
          <EvaText as="span" variant="data">{value.toFixed(step < 1 ? 2 : 0)} {unit}</EvaText>
        </output>
      </FieldTitle>
      <Slider
        aria-labelledby={`${id}-label`}
        className={sliderClassName}
        disabled={disabled}
        max={max}
        min={min}
        onValueChange={(nextValue) => {
          const value = typeof nextValue === "number" ? nextValue : (nextValue[0] ?? min)
          onChange(value)
        }}
        step={step}
        value={[value]}
      />
    </Field>
  )
}

export function LabSelect<T extends string>({
  id,
  label,
  onChange,
  options,
  value,
}: {
  id: string
  label: string
  onChange: (value: T) => void
  options: readonly T[]
  value: T
}) {
  return (
    <Field>
      <FieldTitle className="control-label" id={`${id}-label`}>
        <EvaText as="span" tracking="wide" variant="data">{label}</EvaText>
      </FieldTitle>
      <Select onValueChange={(nextValue) => nextValue && onChange(nextValue as T)} value={value}>
        <SelectTrigger aria-labelledby={`${id}-label`} className="eva-type-select">
          <SelectValue>
            {(selectedValue: T) => (
              <EvaText as="span" uppercase variant="data">{selectedValue}</EvaText>
            )}
          </SelectValue>
        </SelectTrigger>
        <SelectContent alignItemWithTrigger={false} className="eva-type-select-content">
          <SelectGroup>
            {options.map((option) => (
              <SelectItem className="eva-type-select-item" key={option} value={option}>
                <EvaText as="span" uppercase variant="data">{option}</EvaText>
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </Field>
  )
}

export function LabToggle<T extends string>({
  id,
  label,
  onChange,
  options,
  value,
}: {
  id: string
  label: string
  onChange: (value: T) => void
  options: readonly T[]
  value: T
}) {
  return (
    <Field>
      <FieldTitle className="control-label" id={`${id}-label`}>
        <EvaText as="span" tracking="wide" variant="data">{label}</EvaText>
      </FieldTitle>
      <ToggleGroup
        aria-labelledby={`${id}-label`}
        className="gap-0 rounded-none"
        onValueChange={(nextValue) => nextValue[0] && onChange(nextValue[0] as T)}
        spacing={0}
        value={[value]}
      >
        {options.map((option) => (
          <ToggleGroupItem className={toggleClassName} key={option} value={option}>
            <EvaText as="span" uppercase variant="data">{option}</EvaText>
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
    </Field>
  )
}
