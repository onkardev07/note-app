import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import { Button, Box, Divider, Typography } from "@mui/material";
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
import { Loader } from "lucide-react";
import { SigninValidation } from "../../lib/validation";

type FormData = z.infer<typeof SigninValidation>;
const label = { inputProps: { "aria-label": "Checkbox demo" } };

export default function App() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(SigninValidation),
  });

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const [loading, setLoading] = React.useState(false);
  const [apiError, setApiError] = React.useState<string | null>(null);

  const navigate = useNavigate();

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    setApiError(null);

    try {
      const response = await axios.post(`${BASE_URL}/user/signin`, data);
      const { token } = response.data; // Extract the token from the response

      // Store the token in localStorage
      localStorage.setItem("authToken", token);

      console.log("Form Submitted Successfully:", response.data);
      navigate("/dashboard");
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
        <h2 className="text-[30px] font-bold font-sans">Sign in</h2>
        <p className="text-[#969696] text-sm md:text-base mt-1 font-sans">
          Please login to continue to your account.
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
        <p className="text-blue-500 underline hover:text-blue-700 font-sans font-medium text-left w-full">
          <a href="/reset-password">Forgot Password</a>
        </p>
        <p className="text-[#969696] text-sm md:text-base mt-1 font-sans text-left w-full flex items-center -ml-2.5">
          <Checkbox {...label} />
          Keep me logged in
        </p>
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
            backgroundColor: "#367aff",
            "&:hover": {
              backgroundColor: "#2957d0",
            },
          }}
        >
          {loading ? (
            <Loader className="animate-spin mx-auto" size={25} color="white" />
          ) : (
            "Sign In"
          )}
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
          // type="submit"
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
          Sign in with Google
          <img
            src="/assets/icons/plus.svg"
            style={{ width: "20px", marginLeft: "8px" }}
          />
        </Button>
        <p className="text-[#969696] text-sm md:text-base mt-1 text-center font-sans">
          Need an account?
          <a
            href="/signup"
            className="text-blue-500 ml-1 underline hover:text-blue-700 font-sans font-medium"
          >
            Create one
          </a>
        </p>
      </form>
    </div>
  );
}
