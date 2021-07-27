export interface Weather{
    date: string,
    location: {
        city: string,
        country?: string,
    },
    forecast: number,
    hourly_temperature: Array<number>
}