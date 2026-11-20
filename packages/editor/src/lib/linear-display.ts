import {
  getLinearUnitLabel,
  type LinearUnit,
  linearUnitToMeters,
  type MetricNotation,
  metersToLinearUnit,
} from '@pascal-app/core'

export function getLinearDisplay(
  unit: string,
  viewerUnit: LinearUnit,
  metricNotation: MetricNotation,
  precision: number,
  step: number,
) {
  const isImperial = unit === 'm' && viewerUnit !== 'metric'
  const isMillimeters = unit === 'm' && viewerUnit === 'metric' && metricNotation === 'millimeters'
  const displayUnit = isImperial ? getLinearUnitLabel(viewerUnit) : isMillimeters ? 'mm' : unit
  const displayPrecision = isMillimeters ? Math.max(0, precision - 3) : precision
  const displayStep = isMillimeters ? step * 1000 : step
  const parseUnit = isImperial || isMillimeters ? displayUnit : undefined
  const toDisplay = (stored: number) =>
    isImperial ? metersToLinearUnit(stored, viewerUnit) : isMillimeters ? stored * 1000 : stored
  const toStored = (display: number) =>
    isImperial ? linearUnitToMeters(display, viewerUnit) : isMillimeters ? display / 1000 : display
  const roundStored = (stored: number) =>
    toStored(Number.parseFloat(toDisplay(stored).toFixed(displayPrecision)))

  return {
    isImperial,
    displayUnit,
    parseUnit,
    precision: displayPrecision,
    step: displayStep,
    toDisplay,
    toStored,
    roundStored,
  }
}
