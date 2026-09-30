import { EmailItem } from "@/features/portfolio/components/overview/email-item"
import {
  Panel,
  PanelContent,
  PanelDescription,
  PanelHeader,
  PanelTitle,
} from "@/features/portfolio/components/panel"
import { PanelTitleCopy } from "@/features/portfolio/components/panel-title-copy"
import { USER } from "@/features/portfolio/data/user"

const ID = "contact"

export function Contact() {
  return (
    <Panel id={ID} className="screen-line-bottom-none">
      <PanelHeader>
        <PanelTitle>
          <a href={`#${ID}`}>Contact</a>
          <PanelTitleCopy id={ID} />
        </PanelTitle>

        <PanelDescription>
          Reach out for collaboration, freelance work, or just to say hello.
        </PanelDescription>
      </PanelHeader>

      <PanelContent className="grid gap-2.5">
        <EmailItem emailB64={USER.emailB64} />
      </PanelContent>
    </Panel>
  )
}
