use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Debug, Clone)]
#[serde(rename_all = "lowercase")]
pub enum UserVoiceInputType {
    Text,
    Audio,
}

#[derive(Debug, Deserialize, Serialize, Clone)]
pub struct UserVoiceInput {
    pub input_type: UserVoiceInputType,
    pub input: String,
}
