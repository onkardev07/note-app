import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import TextField from "@mui/material/TextField";
import { Button, Box, Divider, Typography } from "@mui/material";
import dayjs, { Dayjs } from "dayjs";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import React from "react";

import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../apiUrl";
import { SignupValidation } from "../../lib/validation";

type FormData = z.infer<typeof SignupValidation>;

export default function App() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(SignupValidation),
  });

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const [loading, setLoading] = React.useState(false);
  const [apiError, setApiError] = React.useState<string | null>(null);
  const navigate = useNavigate();

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    setApiError(null);
    try {
      const response = await axios.post(`${BASE_URL}/user/signup`, data);
      console.log("Form Submitted Successfully:", response.data);
      navigate("/signin");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setApiError(
          error.response?.data?.message ||
            "An unexpected error occurred. Please try again."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col sm:w-420 items-center sm:items-start text-center sm:text-left">
      <div className="w-full flex flex-col items-center lg:items-start text-center lg:text-left">
        <h2 className="text-[30px] font-bold font-sans">Sign up</h2>
        <p className="text-[#969696] text-sm md:text-base mt-1 font-sans">
          Sign up to enjoy the feature of HD
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
        <div>
          <Box
            component="form"
            sx={{ "& .MuiTextField-root": { width: "36ch" } }}
            noValidate
            autoComplete="off"
          >
            <TextField
              {...register("name")}
              id="name"
              label="Your Name"
              variant="outlined"
              size="medium"
              sx={{
                "& .MuiInputBase-root": {
                  height: "48px",
                  display: "flex",
                  alignItems: "center",
                },
                "& .MuiInputBase-input": {
                  fontSize: "14px",
                  padding: "14px 12px",
                },
                "& .MuiInputLabel-root": {
                  fontSize: "13px",
                  backgroundColor: "white",
                  padding: "0 4px",
                  transform: "translate(14px, 16px) scale(1)",
                },
                "& .MuiInputLabel-shrink": {
                  transform: "translate(14px, -6px) scale(0.75)",
                },
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: errors.email ? "red" : "rgba(0, 0, 0, 0.23)",
                },
              }}
              error={!!errors.name}
              helperText={errors.name?.message}
            />
          </Box>
        </div>

        <div>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Controller
              name="dob"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <DatePicker
                  {...field}
                  label="Dob"
                  value={field.value ? dayjs(field.value) : null}
                  onChange={(date: Dayjs | null) =>
                    field.onChange(date ? date.format("YYYY-MM-DD") : "")
                  }
                  slotProps={{
                    textField: {
                      error: !!errors.dob,
                      helperText: errors.dob?.message,
                      sx: {
                        "& .MuiInputBase-root": {
                          height: "48px",
                          width: "35ch",
                          display: "flex",
                          alignItems: "center",
                        },
                        "& .MuiInputBase-input": {
                          fontSize: "14px",
                          padding: "14px 12px",
                        },
                        "& .MuiInputLabel-root": {
                          fontSize: "13px",
                          backgroundColor: "white",
                          padding: "0 4px",
                          transform: "translate(14px, 16px) scale(1)",
                        },
                        "& .MuiInputLabel-shrink": {
                          transform: "translate(14px, -6px) scale(0.75)",
                        },
                        "& .MuiOutlinedInput-notchedOutline": {
                          borderColor: errors.dob
                            ? "red"
                            : "rgba(0, 0, 0, 0.23)",
                        },
                        "& .MuiSvgIcon-root": {
                          fontSize: "20px",
                          marginRight: "8px",
                        },
                      },
                    },
                  }}
                />
              )}
            />
          </LocalizationProvider>
        </div>

        <div>
          <Box
            component="form"
            sx={{ "& .MuiTextField-root": { width: "36ch" } }}
            noValidate
            autoComplete="off"
          >
            <TextField
              {...register("email")}
              id="email"
              type="email"
              label="Email"
              size="medium"
              sx={{
                "& .MuiInputBase-root": {
                  height: "48px",
                  display: "flex",
                  alignItems: "center",
                },
                "& .MuiInputBase-input": {
                  fontSize: "14px",
                  padding: "14px 12px",
                },
                "& .MuiInputLabel-root": {
                  fontSize: "13px",
                  backgroundColor: "white",
                  padding: "0 4px",
                  transform: "translate(14px, 16px) scale(1)",
                },
                "& .MuiInputLabel-shrink": {
                  transform: "translate(14px, -6px) scale(0.75)",
                },
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: errors.email ? "red" : "rgba(0, 0, 0, 0.23)",
                },
              }}
              variant="outlined"
              error={!!errors.email}
              helperText={errors.email?.message}
            />
          </Box>
        </div>
        <div>
          <FormControl
            sx={{
              width: "36ch",
              "& .MuiInputLabel-root": {
                fontSize: "13px",
                backgroundColor: "white",
                padding: "0 4px",
                transform: "translate(14px, 16px) scale(1)",
              },
              "& .MuiInputLabel-shrink": {
                transform: "translate(14px, -6px) scale(0.75)",
              },
            }}
            variant="outlined"
            error={!!errors.password}
          >
            <InputLabel htmlFor="password">Password</InputLabel>
            <Controller
              name="password"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <OutlinedInput
                  {...field}
                  id="password"
                  type={showPassword ? "text" : "password"}
                  size="small"
                  sx={{
                    height: "48px",
                    "& .MuiInputBase-input": {
                      fontSize: "12px",
                      padding: "14px",
                    },
                  }}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label={
                          showPassword
                            ? "hide the password"
                            : "display the password"
                        }
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              )}
            />

            {errors.password && (
              <Typography
                variant="body2"
                color="error"
                sx={{ marginTop: "4px" }}
              >
                {errors.password.message}
              </Typography>
            )}
          </FormControl>
        </div>

        <Button
          type="submit"
          variant="contained"
          disabled={loading}
          sx={{
            width: "35ch",
            height: "40px",
            fontSize: "16px",
            textTransform: "none",
            backgroundColor: loading ? "gray" : "#367aff",
            "&:hover": {
              backgroundColor: loading ? "gray" : "#2957d0",
            },
          }}
        >
          {loading ? "Submitting..." : "Sign Up"}
        </Button>

        {apiError && (
          <Typography variant="body2" color="error" sx={{ marginTop: 1 }}>
            {apiError}
          </Typography>
        )}

        <div className="flex items-center my-4">
          <Divider sx={{ width: "17.2ch" }} />

          <Typography variant="body2" className="mx-[15px] text-gray-500">
            or
          </Typography>
          <Divider sx={{ width: "17.2ch" }} />
        </div>

        <Button
          variant="contained"
          sx={{
            width: "35ch",
            height: "40px",
            fontSize: "16px",
            textTransform: "none",
            backgroundColor: "#ffff",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontWeight: "bold",
            color: "black",
          }}
        >
          Continue with Google
          <img
            src="/assets/icons/plus.svg"
            style={{ width: "20px", marginLeft: "8px" }}
          />
        </Button>
        <p className="text-[#969696] text-sm md:text-base mt-1 text-center font-sans">
          Already have an account?{" "}
          <a
            href="/signin"
            className="text-blue-500 ml-1 underline hover:text-blue-700 font-sans font-medium"
          >
            Sign in
          </a>
        </p>
      </form>
    </div>
  );
}
