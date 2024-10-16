# Component Library

I created a reusable component library for the whole app. It includes simple components, components you can change using props, or complext compound components.

I created all the components code and functionality form zero for learning purposes. List of components functionality inspired by [Shadcn components](https://ui.shadcn.com/docs/components/) _(library itself or code is not used)_.

The examples below shows the usage of them with given default props.

### Button

```jsx
<button isTransparent={false} isSmall={false}>
  Click
</button>
```

### Avatar

```jsx
<Avatar>
  <AvatarFallback>M</AvatarFallback>
</Avatar>
```
