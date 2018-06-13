export function isProfileComplete(attributes) {
  const { family_name, given_name, gender } = attributes;
  return !!family_name && !!given_name && !!gender;
}
