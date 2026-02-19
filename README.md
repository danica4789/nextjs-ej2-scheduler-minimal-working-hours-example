# The EJ2 React Schedule Component does not correctly apply setWorkHours in mobile (adaptive) mode.

## Details of the issue

The EJ2 React Schedule Component does not correctly apply [setWorkHours](https://github.com/SyncfusionExamples/ej2-react-scheduler-resource-different-work-hours) in mobile (adaptive) mode.

### In desktop mode:

- All grouped resources are rendered simultaneously.
- setWorkHours(date, start, end, resourceIndex) works correctly for each resource index.

### In mobile (adaptive) mode:

- Only one resource is rendered at a time.
- The Scheduler internally changes groupIndex when switching resources.
- dataBound is not reliably triggered when the mobile resource dropdown changes.
- setWorkHours does not apply correctly unless manually re-applied for the active groupIndex.

### As a result:

- Working hours appear only for the first resource.
- Switching resources does not update working hours.

## Step to reproduce

```bash
npm install
npm run dev
```

- Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
- Switch the Scheduler to mobile view (responsive mode).
- Refresh the page.
- Select any resource except the first one from the mobile resource dropdown.

### Recreate this repository

```bash
npx create-next-app@latest .
npm install @syncfusion/ej2-react-schedule --save
```

Copy the content of `app/page.tsx` and `app/schedule.tsx` from this repository.

### Commit history of this repository

The first commit is from `npx create-next-app@latest .`, the next commit contains the modifications above.

## Disclaimer

This repository will be deleted once the issue has been solved.
