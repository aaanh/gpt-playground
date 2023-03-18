import {
  Button,
  Persona,
  PersonaProps,
  Popover,
  PopoverProps,
  PopoverSurface,
  PopoverTrigger,
} from "@fluentui/react-components";
import md5 from "md5";

const identity = {
  name: "Anh H. Nguyen",
  secondaryText: "Software Engineer",
  tertiaryText: "Nuance + Microsoft",
  email: "t-anhnguyen@microsoft.com",
};

function gravatarUrl(email: string): string {
  const hash = md5(email);
  return `https://www.gravatar.com/avatar/${hash}`;
}

function MyPersona(
  props: Partial<PersonaProps>,
  popoverProps: Partial<PopoverProps>
) {
  return (
    <>
      <Popover {...popoverProps}>
        <PopoverTrigger disableButtonEnhancement>
          <Button>
            <Persona
              className=""
              name={identity.name}
              secondaryText={identity.secondaryText}
              avatar={{
                image: {
                  src: gravatarUrl(identity.email),
                },
              }}
              size="extra-large"
              {...props}
            />
          </Button>
        </PopoverTrigger>

        <PopoverSurface>
          <div className="flex w-64 flex-col space-y-2">
            <Persona
              className=""
              name={identity.name}
              secondaryText={identity.email}
              tertiaryText={identity.tertiaryText}
              presence={{ status: "available" }}
              avatar={{
                image: {
                  src: gravatarUrl(identity.email),
                },
              }}
              size="extra-large"
              {...props}
            />
          </div>
        </PopoverSurface>
      </Popover>
    </>
  );
}

function MyPersonaNarrow(props: Partial<PersonaProps>) {
  return (
    <Persona
      presence={{ status: "available" }}
      size="extra-large"
      avatar={{
        image: {
          src: "https://avatars.githubusercontent.com/u/37283437?v=4",
        },
      }}
      {...props}
    />
  );
}

export default MyPersona;
export { MyPersonaNarrow };
