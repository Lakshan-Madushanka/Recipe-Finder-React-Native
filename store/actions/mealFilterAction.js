export const FILTER_MEAL = "FILTER_MEAL";

export const setFilters = (flterSettings) => {
  return {
    type: FILTER_MEAL,
    filters: flterSettings,
  };
};
