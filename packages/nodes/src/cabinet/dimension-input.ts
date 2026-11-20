import type { LinearUnit } from '@pascal-app/core'
import { parseMeasurement } from '@pascal-app/editor'

export function parseCabinetDimensionInput(
  input: string,
  options: {
    locale: string
    metricNotation: 'meters' | 'millimeters'
    unit: LinearUnit
  },
): number | null {
  return parseMeasurement(
    input,
    { kind: 'length', unitId: 'm' },
    {
      bareUnit:
        options.unit !== 'metric' ? 'in' : options.metricNotation === 'millimeters' ? 'mm' : 'm',
      locale: options.locale,
      system: options.unit !== 'metric' ? 'imperial' : 'metric',
    },
  )
}
