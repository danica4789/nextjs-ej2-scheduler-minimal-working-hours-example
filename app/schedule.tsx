"use client";

import {
  Inject,
  ScheduleComponent,
  ViewDirective,
  ViewsDirective,
  Day,
  ResourcesDirective,
  ResourceDirective,
} from "@syncfusion/ej2-react-schedule";
import "@syncfusion/ej2-base/styles/material.css";
import "@syncfusion/ej2-buttons/styles/material.css";
import "@syncfusion/ej2-calendars/styles/material.css";
import "@syncfusion/ej2-dropdowns/styles/material.css";
import "@syncfusion/ej2-inputs/styles/material.css";
import "@syncfusion/ej2-lists/styles/material.css";
import "@syncfusion/ej2-navigations/styles/material.css";
import "@syncfusion/ej2-popups/styles/material.css";
import "@syncfusion/ej2-splitbuttons/styles/material.css";
import "@syncfusion/ej2-react-schedule/styles/material.css";
import { useRef } from "react";

type Resource = {
  text: string;
  subtext?: string;
  id: number | string;
  uuid?: string;
  img?: string;
  groupId?: string;
  workDays?: number[];
  workHours?: Record<number, { start: string; end: string }[]>;
};

export default function Schedule({
  data,
  selectedDate,
}: {
  data: {
    Subject: string;
    StartTime: Date;
    EndTime: Date;
    resourceId: number;
  }[];
  selectedDate: Date;
}) {
  const scheduleObj = useRef<ScheduleComponent | null>(null);
  const resources: Resource[] = [
    {
      text: "Butch",
      subtext: "Rider",
      id: 3,
      workDays: [1, 2, 3, 4, 5, 6, 0],
      workHours: {
        0: [{ start: "09:00", end: "17:00" }],
        1: [{ start: "09:00", end: "17:00" }],
        2: [{ start: "09:00", end: "17:00" }],
        3: [{ start: "09:00", end: "17:00" }],
        4: [{ start: "09:00", end: "17:00" }],
        5: [{ start: "09:00", end: "17:00" }],
        6: [{ start: "09:00", end: "17:00" }],
      },
    },
    {
      text: "Ali",
      subtext: "Senior Instructor",
      id: 2,
      workDays: [1, 2, 3, 4, 5, 0],
      workHours: {
        0: [{ start: "07:00", end: "15:00" }],
        1: [{ start: "07:00", end: "15:00" }],
        2: [{ start: "07:00", end: "15:00" }],
        3: [{ start: "07:00", end: "15:00" }],
        4: [{ start: "07:00", end: "15:00" }],
        5: [{ start: "07:00", end: "15:00" }],
        6: [{ start: "07:00", end: "15:00" }],
      },
    },
    {
      text: "Sundance",
      subtext: "Instructor",
      id: 1,
      workDays: [1, 2, 3, 4, 5, 6, 0],
      workHours: {
        0: [{ start: "13:00", end: "22:00" }],
        1: [{ start: "13:00", end: "22:00" }],
        2: [{ start: "13:00", end: "22:00" }],
        3: [{ start: "13:00", end: "22:00" }],
        4: [{ start: "13:00", end: "22:00" }],
        5: [{ start: "13:00", end: "22:00" }],
        6: [{ start: "13:00", end: "22:00" }],
      },
    },
  ];

  const eventSettings = {
    dataSource: data,
  };

  return (
    <div className="flex flex-col gap-4 items-center justify-center">
      <ScheduleComponent
        ref={scheduleObj}
        group={{ byGroupID: false, resources: ["Owners"] }}
        currentView="Day"
        eventSettings={eventSettings}
        selectedDate={selectedDate}
        resourceHeaderTemplate={(props: {
          resource: unknown;
          resourceData: Resource;
        }) => (
          <div className="flex items-center gap-2">
            <div className="flex min-w-0 flex-col">
              <div className="truncate text-xs font-medium">
                {props.resourceData.text}
              </div>
              <div className="truncate text-xs font-normal text-zinc-500">
                {props.resourceData.subtext}
              </div>
            </div>
          </div>
        )}
        dataBound={() => {
          // Set per-resource working hours
          if (scheduleObj.current) {
            const renderedDates =
              scheduleObj.current.activeView.getRenderDates();

            scheduleObj.current.resetWorkHours();

            for (const date of renderedDates) {
              const dayIndex = date.getDay();

              for (let i = 0; i < resources.length; i++) {
                const dayWorkHours = resources[i]?.workHours?.[dayIndex];
                if (!Array.isArray(dayWorkHours) || !dayWorkHours.length)
                  continue;

                for (const { start = "00:00", end = "00:00" } of dayWorkHours) {
                  console.log("start", start);
                  console.log("end", end);
                  scheduleObj.current.setWorkHours([date], start, end, i);
                }
              }
            }
          }

          const toolbar = document.querySelector(
            ".e-schedule-resource-toolbar .e-resource-level-title",
          );
          if (!toolbar) return;

          const resourceName = toolbar.querySelector(".e-resource-name");
          const name = resourceName?.textContent;
          if (!name) return;

          const resource = resources.find((r) => r.text === name);
          if (!resource?.img) return;

          let img = toolbar.querySelector<HTMLImageElement>(
            ".mobile-resource-header",
          );

          if (!img) {
            img = document.createElement("img");
            img.className = "mobile-resource-header";
            toolbar.prepend(img);
          }

          if (img.src !== resource.img) {
            img.src = resource.img;
          }

          if (img.alt !== resource.text) {
            img.alt = resource.text;
          }

          let jobTitle = toolbar.querySelector<HTMLElement>(
            ".mobile-resource-jobtitle",
          );
          if (!jobTitle) {
            jobTitle = document.createElement("div");
            jobTitle.className =
              "mobile-resource-jobtitle truncate text-xs font-normal text-zinc-500 dark:text-zinc-400";
            resourceName.append(jobTitle);
          }

          if (jobTitle.textContent !== resource.subtext && resource.subtext) {
            jobTitle.textContent = resource.subtext;
          }
        }}
      >
        <ViewsDirective>
          <ViewDirective option="Day" />
        </ViewsDirective>
        <ResourcesDirective>
          <ResourceDirective
            field="resourceId"
            name="Owners"
            allowMultiple={false}
            dataSource={resources}
            textField="text"
            idField="id"
            workDaysField="workDays"
            startHourField="startHour"
            endHourField="endHour"
          ></ResourceDirective>
        </ResourcesDirective>
        <Inject services={[Day]} />
      </ScheduleComponent>
    </div>
  );
}
