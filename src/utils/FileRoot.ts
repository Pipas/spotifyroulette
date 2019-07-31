export let root: string

if (process.env.NODE_ENV === 'production') root = '/spotifyRoulette/'
else root = '/'
