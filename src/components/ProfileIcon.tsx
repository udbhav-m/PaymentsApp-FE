function ProfileIcon(props: { firstName: string }) {
  return (
    <>
      <h1
        className={`rounded-full border w-fit px-4 py-2  text-xl font-semibold font-SS bg-slate-300 `}
      >
        {props?.firstName[0].toLocaleUpperCase()}
      </h1>
    </>
  );
}

export default ProfileIcon;
