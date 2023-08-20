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
  jobTitle: "Software Engineer",
  tertiaryText: "",
  email: "anhnguyen@aaanh.com",
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
          <button className="btn btn-lg normal-case btn-outline hover:bg-neutral-700">
            <Persona
              name={identity.name}
              avatar={{
                image: {
                  src: gravatarUrl(identity.email),
                },
              }}
              size="extra-large"
              {...props}
            />
          </button>
        </PopoverTrigger>

        <PopoverSurface>
          <div className="flex w-64 flex-col space-y-2">
            <Persona
              
              name={identity.name}
              secondaryText={identity.jobTitle}
              tertiaryText={identity.email}
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

function MyPersonaNarrow(props: Partial<PersonaProps>,
  popoverProps: Partial<PopoverProps>
) {
  return (
    <Popover {...popoverProps}>
      <PopoverTrigger disableButtonEnhancement>
        <Persona
          
            presence={{ status: "available" }}
            avatar={{
              image: {
                src: gravatarUrl(identity.email),
              },
            }}
            size="extra-large"
            {...props}
          />
      </PopoverTrigger>

      <PopoverSurface>
        <div className="flex w-64 flex-col space-y-2">
          <Persona
            className=""
            name={identity.name}
            secondaryText={identity.jobTitle}
            tertiaryText={identity.email}
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
  );
}

export default MyPersona;
export { MyPersonaNarrow };
