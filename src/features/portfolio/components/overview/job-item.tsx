import { addQueryParams } from "@/utils/url"
import { BriefcaseBusinessIcon, CodeXmlIcon, LightbulbIcon } from "lucide-react"

import { UTM_PARAMS } from "@/config/site"

import {
  IntroItem,
  IntroItemContent,
  IntroItemIcon,
  IntroItemLink,
} from "./intro-item"

type JobItemProps = {
  title: string
  company: string
  website: string
  experienceId?: string
  products?: {
    name: string
    website: string
  }[]
}

export function JobItem({
  title,
  company,
  website,
  experienceId,
  products,
}: JobItemProps) {
  return (
    <IntroItem className="sm:col-span-2">
      <IntroItemIcon>{getJobIcon(title)}</IntroItemIcon>

      <IntroItemContent>
        {title} <span aria-label="at">@</span>
        <IntroItemLink
          className="ml-0.5 font-medium"
          {...(experienceId
            ? {
                href: `#experience-${experienceId}`,
                target: "_self",
                rel: "",
              }
            : {
                href: addQueryParams(website, UTM_PARAMS),
              })}
        >
          {company}
        </IntroItemLink>

        {products?.map((product) => (
          <span key={product.name}>
            {" and "}
            <span aria-label="at">@</span>
            <IntroItemLink
              className="ml-0.5 font-medium"
              href={addQueryParams(product.website, UTM_PARAMS)}
            >
              {product.name}
            </IntroItemLink>
          </span>
        ))}
      </IntroItemContent>
    </IntroItem>
  )
}

function getJobIcon(title: string) {
  if (/(developer|engineer)/i.test(title)) {
    return <CodeXmlIcon />
  }

  if (/(founder|co-founder)/i.test(title)) {
    return <LightbulbIcon />
  }

  return <BriefcaseBusinessIcon />
}
