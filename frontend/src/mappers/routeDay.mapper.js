// mappers/routeDay.mapper.js

class RouteDayMapper {
  /**
   * Maps a single activity from API to DB-compatible format
   * @param {Object} apiActivity - One activity from API
   * @param {number} dayNumber - Day number this activity belongs to
   * @returns {Object} DB-compatible route_day record
   */
  apiToDb(apiActivity, dayNumber) {
    return {
      day_number: dayNumber,
      time_slot: apiActivity.time_slot,
      notes: apiActivity.notes,
      attraction: {
        google_place_id: apiActivity.google_place_id,
        name: apiActivity.place_name,
        address: apiActivity.address,
        rating: apiActivity.rating,
        photo_reference: apiActivity.photo_reference,
      },
    };
  }

  /**
   * Maps a single DB route_day record to view model activity
   * @param {Object} dbItem - Single route_day record from DB
   * @returns {Object} Activity in view format
   */
  dbToView(dbItem) {
    return {
      place_name: dbItem.attraction.name,
      address: dbItem.attraction.address,
      photo_reference: dbItem.attraction.photo_reference,
      time_slot: dbItem.time_slot,
      notes: dbItem.notes,
      google_place_id: dbItem.attraction.google_place_id,
      rating: dbItem.attraction.rating,
    };
  }

  /**
   * Maps a single API activity to view model format
   * @param {Object} apiActivity - One activity from API
   * @returns {Object} Activity in view format
   */
  apiToView(apiActivity) {
    return {
      place_name: apiActivity.place_name,
      address: apiActivity.address,
      photo_reference: apiActivity.photo_reference,
      time_slot: apiActivity.time_slot,
      notes: apiActivity.notes,
      google_place_id: apiActivity.google_place_id,
      rating: apiActivity.rating,
    };
  }
}

export default new RouteDayMapper();
