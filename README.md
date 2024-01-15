# My Super Diaries App
Mobile and Offline first app which allows you to
- Store your deepest secrets
- Store your life journal

### Quality Gate
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=ipr0310_my-super-diaries&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=ipr0310_my-super-diaries)

### Stack
- Expo
- Typescript
- NativeWind

### Expo Commands

- `npx expo install` Install dependencies using expo
- `npx expo start` Start a development server
  - Pressing `a` will open in an Android Emulator or connected device.
  - Pressing `i` will open in an iOS Simulator.
  - Pressing `w` will open in a web browser. Expo supports all major browsers.


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