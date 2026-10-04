/**
 * Filters patient records by date and type.
 *
 * @param {Object[]} records - Patient records.
 * @param {Object} filters - Date and type filters.
 * @returns {Object[]} Filtered records in descending date order.
 */
export function filterHistory(
    records,
    { from = "", to = "", type = "ALL" } = {},
) {
    const isCalendarDate = (value) => {
        if (!value) return true;
        const parsed = new Date(value + "T00:00:00Z");
        return (
            !Number.isNaN(parsed.getTime()) &&
            parsed.toISOString().slice(0, 10) === value
        );
    };
    if (!isCalendarDate(from) || !isCalendarDate(to))
        throw new Error("dateError");
    if (
        (from && !/^\d{4}-\d{2}-\d{2}$/.test(from)) ||
        (to && !/^\d{4}-\d{2}-\d{2}$/.test(to)) ||
        (from && to && from > to)
    )
        throw new Error("dateError");
    const start = from ? Date.parse(from + "T00:00:00-05:00") : -Infinity,
        end = to ? Date.parse(to + "T23:59:59.999-05:00") : Infinity;
    if (Number.isNaN(start) || Number.isNaN(end)) throw new Error("dateError");
    return records
        .filter(
            (r) =>
                (type === "ALL" || r.type === type) &&
                Date.parse(r.recordedAt) >= start &&
                Date.parse(r.recordedAt) <= end,
        )
        .sort(
            (a, b) =>
                b.recordedAt.localeCompare(a.recordedAt) ||
                a.id.localeCompare(b.id),
        );
}
