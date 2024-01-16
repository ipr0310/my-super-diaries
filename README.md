# My Super Diaries App

Mobile and Offline first app which allows you to

- Store your deepest secrets
- Store your life journal

### Quality Gate

[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=ipr0310_my-super-diaries&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=ipr0310_my-super-diaries)

### Stack

- Expo
- Expo Router
- Typescript
- NativeWind

### Expo Commands

- `npx expo install` Install dependencies using expo
- `npx expo start` Start a development server
  - Pressing `a` will open in an Android Emulator or connected device.
  - Pressing `i` will open in an iOS Simulator.
  - Pressing `w` will open in a web browser. Expo supports all major browsers.

### Expo Router Navigation Options

https://docs.expo.dev/router/navigating-pages/

### Built-in Layouts

- **Stack navigation:** Render a stack of screens like a deck of cards with a header on top. This is a native stack navigator that uses native animations and gestures.

- **Tab navigation:** Render screens with a tab bar below them.

- **Drawers:** Add a drawer which can be pulled over the current context.

- **Modals:** Implement native modals which float over the current context.

### Efficient use-case for `clsx`

```typescript
function A({ rounded, className }) {
  const className = clsx(
    "font-bold",
    { rounded },
    variant === "primary" && "bg-blue-500 text-white",
    variant === "secondary" && "bg-blue-500 text-white",
    className
  );
  return <B className={className} />;
}
```
