import { Button, Card, Checkbox, Form, Input } from "antd";
import { FiHome } from "react-icons/fi";
import { IoArrowBackSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Login = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  // HardCoded user credentials
  const validUser = {
    email: "abc@gmail.com",
    password: "123456789",
  };

  const handleSubmit = (values) => {
    // Compare form values with valid user credentials
    if (
      values.email === validUser.email &&
      values.password === validUser.password
    ) {
      navigate("/auction");
    } else {
      setError("Invalid Email or Password");
    }
  };

  return (
    <div className="min-h-svh min-w-full flex flex-col items-center justify-center">
      <Card
        bordered={true}
        style={{
          width: 350,
        }}
      >
        <div className="flex justify-between px-4 pb-4">
          <IoArrowBackSharp
            size={28}
            style={{ cursor: "pointer" }}
            onClick={() => navigate(-1)}
          />
          <FiHome
            size={26}
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/")}
          />
        </div>
        {error && (
          <span className="block px-3 pb-2 text-red-600 font-semibold">
            {error}
          </span>
        )}
        <Form
          name="layout"
          style={{
            width: "100%",
          }}
          initialValues={{
            remember: true,
          }}
          autoComplete="off"
          layout="vertical"
          onFinish={handleSubmit}
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your email!",
              },
              {
                type: "email",
                message: "Please enter a valid email address!",
              },
            ]}
          >
            <Input placeholder="user@example.com" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
              {
                min: 8,
                message: "Password must be at least 8 characters long!",
              },
            ]}
          >
            <Input.Password placeholder="Password123!" />
          </Form.Item>

          <Form.Item name="remember" valuePropName="checked">
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Submit
            </Button>
          </Form.Item>
        </Form>
        <span className="text-center block">
          Don&apos;t have account?{" "}
          <b
            className="cursor-pointer text-blue-600"
            onClick={() => navigate("/signup")}
          >
            signup here
          </b>
        </span>
      </Card>
    </div>
  );
};

export default Login;
// import { Button, Card, Checkbox, Form, Input } from "antd";
// import { FiHome } from "react-icons/fi";
// import { IoArrowBackSharp } from "react-icons/io5";
// import { useNavigate } from "react-router-dom";
// import { useEffect, useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { login } from "../store/auth/authSlice";

// const Login = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const { user, errorData } = useSelector((state) => state.auth);
//   const [error, setError] = useState(errorData);
//   const [formData, setformData] = useState({
//     email: "",
//     password: "",
//   });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!formData.email || !formData.password) {
//       return setError("All fields are required");
//     }
//     try {
//       const resultAction = await dispatch(login(formData));
//       if (login.fulfilled.match(resultAction)) {
//         navigate("/auction");
//       } else {
//         if (resultAction.payload) {
//           setError(resultAction.payload);
//         } else {
//           setError("Login failed. Please try again.");
//         }
//       }
//     } catch (error) {
//       setError("An unexpected error occurred. Please try again.");
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     if (user) {
//       navigate("/auction");
//     }
//   }, [user, navigate]);

//   return (
//     <div className="min-h-svh min-w-full flex flex-col items-center justify-center">
//       <Card
//         bordered={true}
//         style={{
//           width: 350,
//         }}
//       >
//         <div className="flex justify-between px-4 pb-4">
//           <IoArrowBackSharp
//             size={28}
//             style={{ cursor: "pointer" }}
//             onClick={() => navigate(-1)}
//           />
//           <FiHome
//             size={26}
//             style={{ cursor: "pointer" }}
//             onClick={() => navigate("/")}
//           />
//         </div>
//         {error && (
//           <span className="block px-3 pb-2 text-red-600 font-semibold">
//             {error}
//           </span>
//         )}
//         <Form
//           name="layout"
//           style={{
//             width: "100%",
//           }}
//           initialValues={{
//             remember: true,
//           }}
//           autoComplete="off"
//           layout="vertical"
//           onSubmitCapture={handleSubmit}
//         >
//           <Form.Item
//             label="Email"
//             name="email"
//             rules={[
//               {
//                 required: true,
//                 message: "Please input your email!",
//               },
//             ]}
//           >
//             <Input
//               onChange={(e) =>
//                 setformData({ ...formData, email: e.target.value })
//               }
//               value={formData.email}
//             />
//           </Form.Item>

//           <Form.Item
//             label="Password"
//             name="password"
//             rules={[
//               {
//                 required: true,
//                 message: "Please input your password!",
//               },
//             ]}
//           >
//             <Input.Password
//               onChange={(e) =>
//                 setformData({ ...formData, password: e.target.value })
//               }
//               value={formData.password}
//             />
//           </Form.Item>

//           <Form.Item name="remember" valuePropName="checked">
//             <Checkbox>Remember me</Checkbox>
//           </Form.Item>

//           <Form.Item>
//             <Button type="primary" htmlType="submit" block>
//               Submit
//             </Button>
//           </Form.Item>
//         </Form>
//         <span className="text-center block">
//           Don&apos;t have account?{" "}
//           <b
//             className="cursor-pointer text-blue-600"
//             onClick={() => navigate("/signup")}
//           >
//             signup here
//           </b>
//         </span>
//       </Card>
//     </div>
//   );
// };

// export default Login;