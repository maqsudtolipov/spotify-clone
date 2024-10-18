# UI Component Library

I created a reusable component library for the whole app. It includes simple components, components you can change using props, or complext compound components.

I created all the components code and functionality form zero for learning purposes. List of components functionality inspired by [Shadcn components](https://ui.shadcn.com/docs/components/) _(library itself or code is not used)_.

The examples below shows the usage of them with given default props.

### Avatar

```jsx
<Avatar>
  <AvatarFallback>M</AvatarFallback>
</Avatar>
```

### Button

```jsx
<button isTransparent={false} isSmall={false}>
  Click
</button>
```

### Dropdown

```jsx
<Dropdown>
  <Dropdown.Trigger>
    <NavButton isTransparent={true} isSmall={true} icon={<RiHome4Line />} />
  </Dropdown.Trigger>

  <Dropdown.List>
    <Dropdown.Item>Home</Dropdown.Item>
    <Dropdown.Item>Profile</Dropdown.Item>
    <Dropdown.Item underline={true}>Settings</Dropdown.Item>
    <Dropdown.Item>Logout</Dropdown.Item>
  </Dropdown.List>
</Dropdown>
```

### Tooltip

```jsx
<Tooltip>
  <Tooltip.Trigger>
    <span>Profile</span>
  </Tooltip.Trigger>
  <Tooltip.Content position="bottom-left">'John Doe'</Tooltip.Content>
</Tooltip>
```
