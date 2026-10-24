// src/App.jsx --> 
import { RouterProvider } from "react-router"           // Defined routes ko app me inject karne wala provider.
import { router } from "./app.routes.jsx"
import { AuthProvider } from "./features/auth/auth.context.jsx"                       // Poore app ko global user login state provide karne wala context.
import { InterviewProvider } from "./features/interview/interview.context.jsx"



function App() {
  return (
    <AuthProvider>   
      <InterviewProvider>                                     
        <RouterProvider router={router}/>
      </InterviewProvider>
    </AuthProvider>
  )
}

export default App