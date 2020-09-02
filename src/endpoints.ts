export const endpoints = {
  v1: {
    namelist: '/v1/namelist/',
    scatterData: (id: number) => `/v1/${id}/data/`,
    axises: (id: number) => `/v1/${id}/axises/`
  }
}

export const hostname = ''
