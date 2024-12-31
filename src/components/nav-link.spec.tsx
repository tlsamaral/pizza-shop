import { render } from "@testing-library/react"
import { NavLink } from "./nav-link"
import { MemoryRouter } from "react-router-dom"

describe("Nav Link", () => {
  it("should be highlith when nav link is current", () => {
    const wrapper = render(
      <>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/orders">Orders</NavLink>
      </>,
      {
        wrapper: ({ children }) => (
          <MemoryRouter initialEntries={["/orders"]}>
            <div>{children}</div>
          </MemoryRouter>
        ),
      }
    )

    expect(wrapper.getByText("Orders").dataset.current).toEqual("true")
    expect(wrapper.getByText("Home").dataset.current).toEqual("false")
  })
})