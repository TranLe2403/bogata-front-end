import { FormControl, InputLabel, MenuItem, Select } from "@mui/material"
import { FC } from "react"
import { Controller } from "react-hook-form"
import { genres } from "../FilterBox"

export const SelectFormField: FC<{control: any}> = ({ control }) => {
  return (
		<Controller
			name="genres"
			control={control}
			render={({ field }) => (
				<FormControl sx={{ width: "20rem"}}>
					<InputLabel id="genres">Genres</InputLabel>
					<Select
						onChange={field.onChange}
						value={field.value}
						labelId="genres"
						label="Genres"
						multiple
						defaultValue={[]}
					>
						{genres.map((genre) => (
							<MenuItem value={genre} key={genre}>
								{genre}
							</MenuItem>
						))}
					</Select>
				</FormControl>
			)}
		/>      
  )
}