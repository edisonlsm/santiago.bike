import type { Strava } from '~/types/strava';
import { z } from 'zod'

export default defineEventHandler(async (event) => {
  const query = await getValidatedQuery(event, z.object({
    access_token: z.string(),
  }).parse);

  const profile = await $fetch<Strava.Athlete>(
    useRuntimeConfig().stravaApiUrl + '/athlete',
    {
      headers: {
        'Authorization': 'Bearer ' + query.access_token
      }
    }
  )

  return profile;
})