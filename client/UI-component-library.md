# UI Component Library

This doc includes all the UI library components used across the app.

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
    <Dropdown.Item>HomePage</Dropdown.Item>
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
