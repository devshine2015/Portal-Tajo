import PropTypes from 'prop-types';

const shape = PropTypes.shape;
const string = PropTypes.string;

const phrases = {
  undefined: 'Undefined',
  vessel: 'Vessel',
  farm: 'Farm implementation',
  forklift: 'Forklift',
  hgv: 'Heavy Goods Vehicle',
  hgv_chilled: 'Heavy Goods Vehicle Chilled',
  hgv_frozen: 'Heavy Goods Vehicle Frozen',
  mgv: 'Medium Goods Vehicle',
  mgv_chilled: 'Medium Goods Vehicle Chilled',
  mgv_frozen: 'Medium Goods Vehicle Frozen',
  mini_bus: 'Minibus',
  motorcycle: 'Motorcycle',
  passenger_car: 'Passenger Car',
  pick_up: 'Pickup',
  sgv: 'Small Goods Vehicle',
  sgv_chilled: 'Small Goods Vehicle Chilled',
  sgv_frozen: 'Small Goods Vehicle Frozen',
  suv: 'SUV',
  taxi: 'Taxi',
  tractor: 'Traktor',
};

export const phrasesShape = shape({
  undefined: string.isRequired,
  vessel: string.isRequired,
  farm: string.isRequired,
  forklift: string.isRequired,
  hgv: string.isRequired,
  hgv_chilled: string.isRequired,
  hgv_frozen: string.isRequired,
  mgv: string.isRequired,
  mgv_chilled: string.isRequired,
  mgv_frozen: string.isRequired,
  mini_bus: string.isRequired,
  motorcycle: string.isRequired,
  passenger_car: string.isRequired,
  pick_up: string.isRequired,
  sgv: string.isRequired,
  sgv_chilled: string.isRequired,
  sgv_frozen: string.isRequired,
  suv: string.isRequired,
  taxi: string.isRequired,
  tractor: string.isRequired,
});

export default phrases;
