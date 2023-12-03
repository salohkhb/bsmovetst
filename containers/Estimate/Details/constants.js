import messages from './messages';

export const arrivalDateInformationsSectionOptions = [
  { label: messages.radio.arrivalDateInformations.fixe, value: 'fixe' },
  { label: messages.radio.arrivalDateInformations.flexible, value: 'flexible' }
]

export const departureInformationsOptions = [
  { label: messages.radio.departureInformations.no, value: 'no' },
  { label: messages.radio.departureInformations.yes, value: 'yes' },
]

export const DEPARTURE_FLOOR_OPTIONS = [
  { label: messages.selects.floor.ground, value: 0 },
  { label: messages.selects.floor.first, value: 1 },
  { label: messages.selects.floor.second, value: 2 },
  { label: messages.selects.floor.third, value: 3 },
  { label: messages.selects.floor.fourth, value: 4 },
  { label: messages.selects.floor.fifth, value: 5 },
]

export const DEPARTURE_LIFT_OPTIONS = [
  { label: messages.selects.elevator.no, value: false },
  { label: messages.selects.elevator.one_to_two, value: 'one_to_two' },
  { label: messages.selects.elevator.three_to_four, value: 'three_to_four' },
  { label: messages.selects.elevator.five_to_six, value: 'five_to_six' },
  { label: messages.selects.elevator.more, value: 'more' },
]

export const DEPARTURE_FURNITURES_LIFT_OPTIONS = [
  { label: messages.selects.furnituresLift.yes, value: true },
  { label: messages.selects.furnituresLift.no, value: false },
]

export const DEPARTURE_FOOT_DISTANCE_OPTIONS = [
  { label: messages.selects.footDistance.elevenToTwenty, value: '11_20' },
  { label: messages.selects.footDistance.twentyOneToThirty, value: '21_30' },
  { label: messages.selects.footDistance.thirtyOneToFourty, value: '31_40' },
  { label: messages.selects.footDistance.fourtyOneToFifty, value: '41_50' },
  { label: messages.selects.footDistance.moreThanFifty, value: 'more' },
]

export const ARRIVAL_FLOOR_OPTIONS = [
  { label: messages.selects.floor.ground, value: 0 },
  { label: messages.selects.floor.first, value: 1 },
  { label: messages.selects.floor.second, value: 2 },
  { label: messages.selects.floor.third, value: 3 },
  { label: messages.selects.floor.fourth, value: 4 },
  { label: messages.selects.floor.fifth, value: 5 },
]

export const ARRIVAL_LIFT_OPTIONS = [
  { label: messages.selects.elevator.yes, value: true },
  { label: messages.selects.elevator.no, value: false },
]

export const ARRIVAL_FURNITURES_LIFT_OPTIONS = [
  { label: messages.selects.footDistance.zeroToFifty, value: 'small' },
  { label: messages.selects.footDistance.fiftyToHundred, value: 'medium' },
  { label: messages.selects.footDistance.moreThanHundred, value: 'large' },
]

export const ARRIVAL_FOOT_DISTANCE_OPTIONS = [
  { label: messages.selects.furnituresLift.yes, value: true },
  { label: messages.selects.furnituresLift.no, value: false },
]