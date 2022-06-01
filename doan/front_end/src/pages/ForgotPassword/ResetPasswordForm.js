import React from "react";
import { useForm } from "react-hook-form";
import Toast from "../../components/Toast";
import Auth from "../../services/authServices";
import { Link, useParams } from "react-router-dom";

const ResetPasswordForm = ({email}) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const watchFields = watch(["password", "confirm_password"]);

  const onResetPassword = async (data) => {
    try {
      const res = await Auth.resetPassword({ email, password: data.password });
      if (res.data.status === "200") {
        Toast("success", "Reset password success");
      } else {
        Toast("error", "Error reset password");
      }
    } catch (error) {
      Toast("error", error.message);
    }
  };
  return (
    <form className="sign-in-form" onSubmit={handleSubmit(onResetPassword)}>
      <h2 className="title">Reset Password</h2>
      <div className="input-field">
        <i className="fas fa-lock"></i>
        <input
          type="password"
          placeholder="New password"
          {...register("password", { required: true })}
        />
      </div>
      {errors.password && (
        <p style={{ color: "red" }}>This field is required</p>
      )}

      <div className="input-field">
        <i className="fas fa-lock"></i>
        <input
          type="password"
          placeholder="Confirm Password"
          {...register("confirm_password", { required: true })}
        />
      </div>
      {errors.confirm_password && (
        <p style={{ color: "red" }}>This field is required</p>
      )}
      {watchFields[0] !== watchFields[1] && (
        <p style={{ color: "red" }}>password not the same</p>
      )}
      <input type="submit" value="Reset Password" className="btn solid" />
      <Link to="/login">Back to login</Link>
    </form>
  );
};

export default ResetPasswordForm;
